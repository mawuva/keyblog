<?php

declare(strict_types=1);

namespace Domain\Users\Services;

use GuzzleHttp\Client;
use Domain\Users\Data\CreatesUserData;
use Domain\Users\Data\KeycloakUserData;
use Domain\Users\Data\KeycloakTokenData;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

class KeycloakService
{
    protected $client;
    protected $baseUrl;
    protected $realms;
    protected $clientId;
    protected $username;
    protected $password;
    protected $resourceClientId;

    public function __construct()
    {
        $this->baseUrl = config('services.keycloak.base_url');
        $this->realms = config('services.keycloak.realms');
        $this->clientId = config('services.keycloak.admin_client_id');
        $this->username = config('services.keycloak.admin_username');
        $this->password = config('services.keycloak.admin_password');
        $this->resourceClientId = config('services.keycloak.client_id');
        $this->client = new Client();
    }

    public function getToken(): string
    {
        $response = $this->client->post("{$this->baseUrl}/realms/master/protocol/openid-connect/token", [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => $this->clientId,
                'username' => $this->username,
                'password' => $this->password,
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['access_token'];
    }

    public function createUser(CreatesUserData $data): array
    {
        $token = $this->getToken();

        $response = $this->client->post("{$this->baseUrl}/admin/realms/{$this->realms}/users", [
            'headers' => [
                'Authorization' => "Bearer {$token}",
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'username' => $data->email,
                'email' => $data->email,
                'enabled' => true,
                'firstName' => $data->first_name,
                'lastName' => $data->last_name,
                'credentials' => [
                    [
                        'type' => 'password',
                        'value' => $data->password,
                        'temporary' => false,
                    ]
                ],
            ],
        ]);

        return [
            'status' => $response->getStatusCode(),
            'body' => $response->getBody()->getContents(),
        ];
    }

    /**
     * Décodage simple JWT
     */
    public function decodeJwt(string $token): array
    {
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            throw new \Exception('Invalid JWT token');
        }

        return json_decode(
            base64_decode(strtr($parts[1], '-_', '+/')),
            true
        );
    }

    /**
     * Extraire les informations utilisateur du token JWT
     */
    public function extractUserInfoFromToken(string $token): KeycloakTokenData
    {
        $payload = $this->decodeJwt($token);

        return KeycloakTokenData::from([
            'token_id'     => $payload['jti'],
            'username'     => $payload['preferred_username'] ?? null,
            'email'        => $payload['email'] ?? null,
            'name'         => $payload['name'] ?? null,
            'groups'       => $payload['groups'] ?? [],
            'realm_roles'  => $payload['realm_access']['roles'] ?? [],
            'client_roles' => $payload['resource_access'][$this->resourceClientId]['roles'] ?? [],
            'scopes'       => explode(' ', $payload['scope'] ?? ''),
        ]);
    }

    public function mapSocialiteUser(SocialiteUser $user): KeycloakUserData
    {
        $payload = $this->decodeJwt($user->token);

        return KeycloakUserData::from([
            'keycloak_id'  => $user->id, // le plus safe
            'email'        => $user->email,
            'name'         => $user->name,
            'username'     => $user->nickname ?? $user->email,  
            'groups'       => $payload['groups'] ?? [],
            'realm_roles'  => $payload['realm_access']['roles'] ?? [],
            'client_roles' => $payload['resource_access'][$this->resourceClientId]['roles'] ?? [],
            'scopes'       => explode(' ', $payload['scope'] ?? ''),
        ]);
    }

    /**
     * Obtenir l'URL de redirection vers Keycloak
     */
    public function getLoginUrl(): string
    {
        return Socialite::driver('keycloak')->redirect()->getTargetUrl();
    }

    /**
     * Obtenir l'URL de logout Keycloak
     */
    public function getLogoutUrl(): string
    {
        $redirectUri = urlencode(config('app.url'));
        
        return config('services.keycloak.base_url')
            . '/realms/'
            . config('services.keycloak.realms')
            . '/protocol/openid-connect/logout'
            . '?redirect_uri=' . $redirectUri;
    }
}

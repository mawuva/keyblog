<?php

declare(strict_types=1);


namespace App\Support\Flash;

use Illuminate\Contracts\Session\Session;
use Illuminate\Session\Store;

class Flash
{
    /** @var Session|Store */
    protected Session|Store $session;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    public function getMessage(): ?Message
    {
        $flashedMessageProperties = $this->session->get('laravel_flash_message');

        if (! $flashedMessageProperties) {
            return null;
        }

        return new Message(
            $flashedMessageProperties['message'],
            $flashedMessageProperties['level']
        );
    }

    public function flash(Message $message): void
    {
        $this->session->flash('laravel_flash_message', $message->toArray());
    }

    public function info(string $message): void
    {
        $this->flash(new Message($message, 'info'));
    }

    public function error(string $message): void
    {
        $this->flash(new Message($message, 'error'));
    }

    public function success(string $message): void
    {
        $this->flash(new Message($message, 'success'));
    }

    public function warning(string $message): void
    {
        $this->flash(new Message($message, 'warning'));
    }
}

<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Exceptions;

use RuntimeException;

final class TransitionException extends RuntimeException
{
    private string $fromStatus;
    private string $toStatus;
    private array $allowedTransitions;
    private ?string $modelType;

    public function __construct(
        string $message = '',
        int $code = 0,
        ?\Throwable $previous = null,
        string $fromStatus = '',
        string $toStatus = '',
        array $allowedTransitions = [],
        ?string $modelType = null
    ) {
        parent::__construct($message, $code, $previous);
        
        $this->fromStatus = $fromStatus;
        $this->toStatus = $toStatus;
        $this->allowedTransitions = $allowedTransitions;
        $this->modelType = $modelType;
    }

    /**
     * Create a new transition exception with detailed context.
     */
    public static function invalidTransition(
        string $fromStatus,
        string $toStatus,
        array $allowedTransitions = [],
        ?string $modelType = null
    ): self {
        $message = self::buildDetailedMessage($fromStatus, $toStatus, $allowedTransitions, $modelType);
        
        return new self(
            $message,
            0,
            null,
            $fromStatus,
            $toStatus,
            $allowedTransitions,
            $modelType
        );
    }

    /**
     * Create a transition exception for invalid status value.
     */
    public static function invalidStatusValue(string $status, ?string $modelType = null): self
    {
        $modelInfo = $modelType ? " for model {$modelType}" : '';
        $message = "Invalid status value '{$status}'{$modelInfo}. Status must be a valid enum value.";
        
        return new self($message, 0, null, '', $status, [], $modelType);
    }

    /**
     * Create a transition exception for missing transition map.
     */
    public static function missingTransitionMap(string $modelType): self
    {
        $message = "No transition map defined for model type: {$modelType}. " .
                  "Please implement statusTransitionMap() method in the model.";
        
        return new self($message, 0, null, '', '', [], $modelType);
    }

    /**
     * Get the source status.
     */
    public function getFromStatus(): string
    {
        return $this->fromStatus;
    }

    /**
     * Get the target status.
     */
    public function getToStatus(): string
    {
        return $this->toStatus;
    }

    /**
     * Get the allowed transitions from the source status.
     */
    public function getAllowedTransitions(): array
    {
        return $this->allowedTransitions;
    }

    /**
     * Get the model type if available.
     */
    public function getModelType(): ?string
    {
        return $this->modelType;
    }

    /**
     * Get all exception data as array for logging.
     */
    public function getContext(): array
    {
        return [
            'from_status' => $this->fromStatus,
            'to_status' => $this->toStatus,
            'allowed_transitions' => $this->allowedTransitions,
            'model_type' => $this->modelType,
            'message' => $this->getMessage(),
        ];
    }

    /**
     * Build a detailed error message for debugging.
     */
    private static function buildDetailedMessage(
        string $fromStatus,
        string $toStatus,
        array $allowedTransitions,
        ?string $modelType
    ): string {
        $modelInfo = $modelType ? " for {$modelType}" : '';
        
        $baseMessage = "Invalid status transition{$modelInfo}: '{$fromStatus}' → '{$toStatus}'";
        
        if (empty($allowedTransitions)) {
            $baseMessage .= ". No transitions are allowed from '{$fromStatus}'.";
        } else {
            $allowedList = implode("', '", $allowedTransitions);
            $baseMessage .= ". Allowed transitions from '{$fromStatus}' are: '{$allowedList}'.";
        }
        
        return $baseMessage;
    }

    /**
     * Convert exception to array for API responses.
     */
    public function toArray(): array
    {
        return [
            'error' => 'Invalid status transition',
            'from_status' => $this->fromStatus,
            'to_status' => $this->toStatus,
            'allowed_transitions' => $this->allowedTransitions,
            'model_type' => $this->modelType,
            'message' => $this->getMessage(),
        ];
    }
}

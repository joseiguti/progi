<?php

namespace App\Controller\Api;

use App\Service\LiquidationParameters;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class LiquidationParametersController
{
    private LiquidationParameters $liquidationParameters;

    /**
     * LiquidationParametersController constructor.
     *
     * @param LiquidationParameters $liquidationParameters The liquidation parameters service
     */
    public function __construct(LiquidationParameters $liquidationParameters)
    {
        $this->liquidationParameters = $liquidationParameters;
    }

    /**
     * Retrieves the liquidation parameters.
     *
     * @Route("/api/liquidation/parameters", methods={"GET"})
     *
     * @return JsonResponse The JSON response containing the liquidation parameters
     */
    public function parameters(): JsonResponse
    {
        $parameters = $this->liquidationParameters->getParameters();

        return new JsonResponse(['parameters' => $parameters]);
    }
}

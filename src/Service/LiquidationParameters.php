<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class LiquidationParameters
{
    private ParameterBagInterface $parameterBag;

    /**
     * LiquidationParameters constructor.
     *
     * @param ParameterBagInterface $parameterBag The parameter bag interface.
     */
    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->parameterBag = $parameterBag;
    }

    /**
     * Retrieves the liquidation parameters.
     *
     * @return array The liquidation parameters.
     */
    public function getParameters(): array
    {
        return $this->parameterBag->get('liquidation_parameters');
    }
}

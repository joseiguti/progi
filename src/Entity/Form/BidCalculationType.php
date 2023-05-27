<?php

namespace App\Entity\Form;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;

class BidCalculationType extends AbstractType
{
    private ParameterBagInterface $parameterBag;

    /**
     * BidCalculationType constructor.
     *
     * @param ParameterBagInterface $parameterBag The parameter bag interface.
     */
    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->parameterBag = $parameterBag;
    }

    /**
     * Builds the bid calculation form.
     *
     * @param FormBuilderInterface $builder The form builder interface.
     * @param array $options The options for the form.
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $vehicleTypes = $this->parameterBag->get('vehicle_types');

        $builder
            ->add('amount', NumberType::class, [
                'label' => 'Vehicle base price'
            ])
            ->add('description', ChoiceType::class, [
                'label' => 'Vehicle type',
                'choices' => array_flip($vehicleTypes),
                'placeholder' => 'Select vehicle type',
                'attr' => ['class' => 'form-control'],
            ]);
    }
}

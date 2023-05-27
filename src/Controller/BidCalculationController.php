<?php

namespace App\Controller;

use App\Entity\Form\BidCalculationType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BidCalculationController extends AbstractController
{
    /**
     * Renders the bid calculation form.
     *
     * @Route("/bid/calculation", name="app_bid_calculation")
     *
     * @return Response The response containing the rendered form view
     */
    public function index(): Response
    {
        $form = $this->createForm(BidCalculationType::class);

        return $this->render('bid_calculation/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

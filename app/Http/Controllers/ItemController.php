<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function getItems(Request $request)
    {
        $items = Item::paginate(10);

        return [
            'status' => "success",
            'items' => $items
        ]; 
    }
}

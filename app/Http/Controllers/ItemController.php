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
        


        if (!empty($request->search)) {
            $items = Item::sortable(['price' => $request->sort])
            ->where('name', 'like', "%{$request->search}%")
            ->orWhere('description', 'like', "%{$request->search}%")
            ->paginate(10);
        } else {
            $items = Item::sortable(['price' => $request->sort])->paginate(10);
        }

        return [
            'status' => "success",
            'items' => $items
        ]; 
    }
}

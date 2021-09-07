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

    public function getItemDetails($id, Request $request)
    {
        $item = Item::findOrFail($id);
        $item->last_bid = $item->bids->last();
        return $item;
    }

    public function addBid(Request $request)
    {
        // Validating
        $validated = $request->validate([
            'bid' => 'required',
            'user' => 'required',
            'id' => 'required',
        ]);

        $item = Item::findOrFail($request->id);
        $last_bid = $item->bids->last();

         // Adding the new bid
        $item->bids()->create(['user_id' => $request->user,
                                'item_id' => $request->id,
                                'bid' => $request->bid,
                                'autobid' => $request->auto_bid,
                                ]);

        // Checking if there was autobid for the last bid
        if (!empty($last_bid) && $last_bid->autobid) {
            $item->bids()->create(['user_id' => $last_bid->user_id,
                                'item_id' => $last_bid->item_id,
                                'bid' => ($request->bid + 1),
                                'autobid' => false,
                                ]);
        }

        return ['status' => 'success'];
    }
}

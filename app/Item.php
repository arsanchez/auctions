<?php

namespace App;

use Kyslik\ColumnSortable\Sortable;
use Illuminate\Database\Eloquent\Model;
use App\Bid;

class Item extends Model
{
    use sortable;

    public $sortable = ['price'];

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }
}

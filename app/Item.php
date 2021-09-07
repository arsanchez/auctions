<?php

namespace App;

use Kyslik\ColumnSortable\Sortable;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use sortable;

    public $sortable = ['price'];
}

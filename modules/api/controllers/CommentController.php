<?php

namespace app\modules\api\controllers;

use yii\rest\ActiveController;

class CommentController extends ActiveController
{
    public $modelClass = 'app\modules\api\models\Comment';

    public function actions()
    {
        $actions = parent::actions();
        $actions['index'] = 'app\modules\api\controllers\comment\IndexAction';
        $actions['create'] = 'app\modules\api\controllers\comment\CreateAction';
        $actions['rate'] = 'app\modules\api\controllers\comment\RateAction';
        return $actions;
    }
}

<?php

namespace app\modules\api\controllers;

use yii\rest\ActiveController;

class ArticleController extends ActiveController
{
    public $modelClass = 'app\modules\api\models\Article';

    public function actions()
    {
        $actions = parent::actions();
        $actions['index'] = 'app\modules\api\controllers\article\IndexAction';
        return $actions;
    }
}

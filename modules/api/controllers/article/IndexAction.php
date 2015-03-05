<?php
namespace app\modules\api\controllers\article;

use yii\rest\Action;
use app\modules\api\models\Article;

class IndexAction extends Action
{
    public $modelClass = 'app\modules\api\models\Article';

    public function run()
    {
        return Article::find()->orderBy('id DESC')->all();
    }
}
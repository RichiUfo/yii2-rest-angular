<?php
namespace app\modules\api\controllers\comment;

use yii\rest\Action;
use app\modules\api\models\Comment;

class IndexAction extends Action
{
    public $modelClass = 'app\modules\api\models\Article';

    public function run($type, $type_id)
    {
        return Comment::find()
            ->where(['type' => $type, 'type_id' => $type_id])
            ->orderBy('hash ASC')
            ->all();
    }
}
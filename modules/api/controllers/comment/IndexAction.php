<?php
namespace app\modules\api\controllers\comment;

use yii\rest\Action;
use app\modules\api\models\Comment;
use app\modules\api\controllers\CommentController;

class IndexAction extends Action
{
    public $modelClass = 'app\modules\api\models\Article';

    public function run($type, $type_id)
    {
        $comments = Comment::find()
            ->where(['type' => $type, 'type_id' => $type_id])
            ->all();
        return $comments;
    }
}
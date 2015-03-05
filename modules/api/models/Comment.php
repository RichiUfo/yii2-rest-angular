<?php

namespace app\modules\api\models;

use \yii\db\ActiveRecord;

class Comment extends ActiveRecord
{
    public function rules()
    {
        return [
            [['text'], 'required'],
            [['type', 'type_id'], 'safe'],
        ];
    }

}

<?php

namespace app\modules\api\models;

use \yii\db\ActiveRecord;

class Article extends ActiveRecord
{
    public function rules()
    {
        return [
            [['title', 'text'], 'required'],
        ];
    }
}

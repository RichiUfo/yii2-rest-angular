<?php

namespace app\modules\api\models;

use Yii;
use \yii\db\ActiveRecord;
use \yii\db\Query;

class Comment extends ActiveRecord
{
    const  MAX_LEVEL = 3;
    const  DIGIT = 2;

    public function rules()
    {
        return [
            [['text', 'name', 'email'], 'required'],
            [['email'], 'email'],
            [['type', 'type_id', 'parent_id', 'hash', 'level', 'count_childs', 'rate', 'created'], 'safe'],
        ];
    }

    public function generateHash($strNumber, $strPartHash = '')
    {
        if (mb_strlen($strNumber) < self::DIGIT)
        {
            $strNumber = '0' . $strNumber;
        }

        $strNumber = $strPartHash . $strNumber;

        while(mb_strlen($strNumber) < self::DIGIT * self::MAX_LEVEL)
        {
            $strNumber .= '0';
        }
        return $strNumber;
    }

    public function beforeSave($insert)
    {
        date_default_timezone_set('Asia/Yekaterinburg');
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord)
            {
                $this->rate = 0;
                $this->created = date('Y-m-d H:i:s', time());
                $this->count_childs = 0;
            }
            return parent::beforeSave($insert);
        } else {
            return false;
        }
    }

    public function prepareForSave($arrParams)
    {
        if (isset($arrParams['parent_id']) && $arrParams['parent_id'] !== 0)
        {
            $objParentComment = $this->getParent($arrParams['parent_id']);
            if (!$objParentComment)
            {
                throw new ServerErrorHttpException('Not Found Parent Comment');
            }

            if ($objParentComment['level'] < self::MAX_LEVEL)
            {
                $intCutLen = $objParentComment['level'] * self::DIGIT;
                $arrParams['level'] = $objParentComment['level'] + 1;
                $strPartHash1 = $objParentComment['count_childs'] + 1;
                $this->incrementFieldById('count_childs', $arrParams['parent_id']);
            } else
            {
                $intCutLen = ($objParentComment['level'] - 1) * self::DIGIT;
                $arrParams['level'] = $objParentComment['level'];
                $objOlderParent = $this->getParent($objParentComment['parent_id']);
                $strPartHash1 = $objOlderParent['count_childs'] + 1;
                $this->incrementFieldById('count_childs', $objOlderParent['id']);
            }

            $strPartHash2 = mb_substr($objParentComment['hash'], 0, $intCutLen);
            $arrParams['hash'] = $this->generateHash($strPartHash1, $strPartHash2);
        } else
        {
            $intCount = $this->countComment($arrParams['type'], $arrParams['type_id']);
            $arrParams['hash'] = $this->generateHash(++$intCount);
            $arrParams['level'] = 1;
        }
        return $arrParams;
    }

    public function getParent($intParent)
    {
        if (!$intParent) return false;
        $objQuery = new Query();
        return $objQuery
                    ->select('*')
                    ->from($this->tableName())
                    ->where(['id' => $intParent])
                    ->one();
    }

    public function incrementFieldById($strField, $intId, $boolType = 1)
    {
        if(!$strField || !$intId) return false;
        $strTable = $this->tableName();
        if($boolType)
        {
            $strIncr = '+';
        } else
        {
            $strIncr = '-';
        }
        Yii::$app->db->createCommand("UPDATE $strTable SET $strField = $strField $strIncr 1 WHERE id=:id")
            ->bindValue(':id', $intId)
            ->execute();
        return true;
    }

    public function countComment($strType, $intTypeId, $intId = 0)
    {
        if(!$strType || !$intTypeId) return false;
        $objQuery = new Query();
        return $objQuery
            ->select('id')
            ->from($this->tableName())
            ->where(['parent_id' => $intId, 'type' => $strType, 'type_id' => $intTypeId])
            ->count();
    }

}

<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
//        'css/bootstrap.min.css',
//        'css/clean-blog/clean-blog.min.css',
//        'css/site.css',
            'css/main.css'
    ];
    public $js = [
//        'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.js',
//        'libs/angular-ui-router.min.js',
//        'libs/angular-filter.min.js',
//        'libs/ui-bootstrap-0.12.1.min.js',
//        'libs/ui-bootstrap-tpls-0.12.1.min.js',
//        'libs/clean-blog/jquery.js',
//        'libs/clean-blog/clean-blog.min.js',
//        'js/app.js',
//        'js/routes.js',
//        'js/filters.js',
//        'js/services/articleService.js',
//        'js/services/commentService.js',
//        'js/controllers/articleController.js',
//        'js/controllers/headerController.js',
//        'js/pure.js'
            'dist/js/all.min.js'
    ];
    public $depends = [];
}

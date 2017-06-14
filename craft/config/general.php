<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */


return array(

  '*' => array(
    'omitScriptNameInUrls' => true,
    'defaultImageQuality' => 90,
    'maxUploadFileSize' => 33554432,
  ),
    'localhost' => array(
    'devMode' => true,
    'siteUrl' => 'http://localhost:8888/',

    /* Environment Variables */
    'environmentVariables' => array(
      'baseAssetUrl'  => 'http://localhost:8888',
      'baseAssetPath' => '/users/austenezzell/Desktop/refuge/build',
    )
  ),
  'cincodesign.cinco.io' => array(
    'siteUrl' => 'http://cincodesign.cinco.io/',

    /* Environment Variables */
    'environmentVariables' => array(
      'baseAssetUrl'  => '//cincodesign.cinco.io',
      'baseAssetPath' => '/srv/www/cincodesign.cinco.io/build',
    )
  )
);

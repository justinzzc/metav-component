<!DOCTYPE html>
<html lang="en">
  <head>
    <title>three.js webgl - animation - keyframes</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="{{METAV_PUBLIC_PATH}}main.css" />
    <style>
      body {
        background-color: #bfe3dd;
        color: #000;
      }

      a {
        color: #2983ff;
      }
    </style>
  </head>

  <body>
    <script>{{PRESET_SCRIPT_CODE}}</script>
    <div id="container"></div>
    <script type="importmap">
      {
        "imports": {
          "three": "{{PLAYGROUND_SRC_PATH}}three-0.174/build/three.module.min.js",
          "three/addons/": "{{PLAYGROUND_SRC_PATH}}three-0.174/examples/jsm/",
          "three/examples/": "{{PLAYGROUND_SRC_PATH}}three-0.174/examples/"
        }
      }
    </script>

    <script type="module">
      //prettier-ignore 忽略格式化
      {{SCRIPT_CODE}}
    </script>
  </body>
</html>

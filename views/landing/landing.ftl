<#include "../common/macro.ftl">
<!DOCTYPE html>
<html>
  <@headWrapper>
  <title>客群洞察</title>
  </@headWrapper>
  <body>
    <@bodyWrapper>
    <@setting />
    <script>
      window.setting.landing = {
        customerGroupCount:${customerGroupCount!0},
        insightCount:${insightCount!0}
      };
    </script>
    <@serverRenderReactDOM />
    </@bodyWrapper>
  </body>
</html>

const AccessControl = require('accesscontrol');
const ac = new AccessControl();


exports.roles = (function(){
    ac.grant("student")
      .readOwn("")
      .updateOwn("")

    ac.grant("tutor")
      .extend("student")
      .readAny("")

    ac.grant("admin")
      .extend("student")
      .extend("tutor")
      .updateAny("")
      .deleteAny("")

return ac;
})
();
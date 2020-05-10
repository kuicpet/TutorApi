const AccessControl = require('accesscontrol');
const ac = new AccessControl();


exports.roles = (function(){
    ac.grant("student")
      .readOwn("subject")
      .readAny("tutor")
      .createAny("lesson")

    ac.grant("tutor")
      .extend("student")
      .readAny("subject")
      .updateOwn("subject")
      .deleteOwn("subject")

    ac.grant("admin")
      .extend("student")
      .extend("tutor")
      .createAny("subject",)
      .updateAny("subject","lesson")
      .deleteAny("subject","category","tutor","lesson")

return ac;
})
();
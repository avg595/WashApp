# WashApp

**STEPS**\
npm install -g @angular/cli\
ng new my-app\
cd my-app\
ng serve --open\

npm install bootstrap --save\

in angular.json\
  "styles": [\
    "node_modules/bootstrap/dist/css/bootstrap.min.css",\
    "src/styles.css"\
  ],\
  
or styles.css\
@import '~bootstrap/dist/css/bootstrap.min.css';\
                        
ng g c component\

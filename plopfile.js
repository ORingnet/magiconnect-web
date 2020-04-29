module.exports = function(plop) {
  // create your generators here
  plop.setGenerator('component', {
    description: '創建新的 component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '輸入 compoent 的名稱'
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/{{ properCase name }}/{{ properCase name }}.js',
        templateFile: 'plop-templates/compoent.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{ properCase name }}/index.js',
        templateFile: 'plop-templates/index.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{ properCase name }}/Styled{{ properCase name }}.js',
        templateFile: 'plop-templates/styledComponent.hbs'
      }
    ] // array of actions
  });
  plop.setGenerator('container', {
    description: '創建新的 container',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '輸入 container 的名稱'
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/container/{{ properCase name }}/{{ properCase name }}.js',
        templateFile: 'plop-templates/container.hbs'
      },
      {
        type: 'add',
        path: 'src/container/{{ properCase name }}/index.js',
        templateFile: 'plop-templates/index.hbs'
      },
      {
        type: 'add',
        path: 'src/container/{{ properCase name }}/styled{{ properCase name }}.js',
        templateFile: 'plop-templates/styledComponent.hbs'
      }
    ] // array of actions
  });
  plop.setGenerator('page', {
    description: '創建新的 page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '輸入 page 的名稱'
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{ properCase name }}/{{ properCase name }}.js',
        templateFile: 'plop-templates/compoent.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{ properCase name }}/index.js',
        templateFile: 'plop-templates/index.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{ properCase name }}/styled{{ properCase name }}.js',
        templateFile: 'plop-templates/styledComponent.hbs'
      }
    ] // array of actions
  });
  plop.setGenerator('store', {
    description: '創建新的 store',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '輸入 store 的名稱'
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/store/{{ camelCase name }}/{{ camelCase name }}Action.js',
        templateFile: 'plop-templates/store/action.hbs'
      },
      {
        type: 'add',
        path: 'src/store/{{ camelCase name }}/{{ camelCase name }}ActionTypes.js',
        templateFile: 'plop-templates/store/actionTypes.hbs'
      },
      {
        type: 'add',
        path: 'src/store/{{ camelCase name }}/{{ camelCase name }}Reducer.js',
        templateFile: 'plop-templates/store/reducer.hbs'
      }
    ] // array of actions
  });
  /* plop.setGenerator('名稱','物件' {
    description: 描述,
    prompts:[{
          type: 'input' ( 需要input的值讓你輸入 ),
          name: 'name' ( 這個會變成變數 ),
          message: '輸入 compoent 的名稱'
      }],
    actions: [    <-創建的行為
      {
          type: 'add', <- 產生新的檔案
          path: 'src/components/{{name}}/{{name}}.vue',
          templateFile: 'plop-templates/controller.hbs'
      }
    ]
  })*/
};

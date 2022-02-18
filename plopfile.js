module.exports = function (plop) {
  plop.setHelper('upperCase', txt => txt.toUpperCase());
  plop.setHelper('toPathName', value =>
    value
      .match(/[A-Z][a-z]+|[0-9]+/g)
      .map(e => e.toLowerCase())
      .join('-'),
  );
  // create your generators here
  plop.setGenerator('atom', {
    description: 'generate atom component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'atom name please',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/atoms/{{toPathName name}}/{{toPathName name}}.component.js',
        templateFile: 'plop-templates/atoms.component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/atoms/{{toPathName name}}/{{toPathName name}}.style.js',
        templateFile: 'plop-templates/style.hbs',
      },
      {
        type: 'append',
        path: 'src/components/atoms/index.js',
        templateFile: 'plop-templates/import.hbs',
      },
    ], // array of actions
  });
  plop.setGenerator('template', {
    description: 'generate template component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'template name please',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/templates/{{toPathName name}}/{{toPathName name}}.component.js',
        templateFile: 'plop-templates/atoms.component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/templates/{{toPathName name}}/{{toPathName name}}.style.js',
        templateFile: 'plop-templates/style.hbs',
      },
      {
        type: 'append',
        path: 'src/components/templates/index.js',
        templateFile: 'plop-templates/import.hbs',
      },
    ], // array of actions
  });

  plop.setGenerator('scene', {
    description: 'generate scene component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'scene name please',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/scenes/{{toPathName name}}/{{toPathName name}}.component.js',
        templateFile: 'plop-templates/scenes.component.hbs',
      },
      {
        type: 'add',
        path: 'src/scenes/{{toPathName name}}/{{toPathName name}}.style.js',
        templateFile: 'plop-templates/style.hbs',
      },
      {
        type: 'append',
        path: 'src/scenes/index.js',
        templateFile: 'plop-templates/import.hbs',
      },
      {
        type: 'modify',
        path: 'src/navigations/app-navigator.js',
        pattern: /(\/\* IMPORT SCREEN HERE \*\/)/g,
        template: ', {{name}} $1',
      },
      {
        type: 'modify',
        path: 'src/navigations/app-navigator.js',
        pattern: /(\/\* ADD SCREEN HERE \*\/)/g,
        template:
          '{\n' +
          "    name: '{{name}}',\n" +
          '    component: {{name}},\n' +
          '    options: {},\n' +
          '  },\n  $1',
      },
    ], // array of actions
  });

  plop.setGenerator('molecule', {
    description: 'generate molecule component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'molecule name please',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/molecules/{{toPathName name}}/{{toPathName name}}.component.js',
        templateFile: 'plop-templates/atoms.component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/molecules/{{toPathName name}}/{{toPathName name}}.style.js',
        templateFile: 'plop-templates/style.hbs',
      },
      {
        type: 'append',
        path: 'src/components/molecules/index.js',
        templateFile: 'plop-templates/import.hbs',
      },
    ], // array of actions
  });

  plop.setGenerator('organism', {
    description: 'generate organism component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'organism name please',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/organisms/{{toPathName name}}/{{toPathName name}}.component.js',
        templateFile: 'plop-templates/atoms.component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/organisms/{{toPathName name}}/{{toPathName name}}.style.js',
        templateFile: 'plop-templates/style.hbs',
      },
      {
        type: 'append',
        path: 'src/components/organisms/index.js',
        templateFile: 'plop-templates/import.hbs',
      },
    ], // array of actions
  });
};

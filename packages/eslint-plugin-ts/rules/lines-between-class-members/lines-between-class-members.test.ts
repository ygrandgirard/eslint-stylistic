// this rule tests the new lines, which prettier will want to fix and break the tests
/* /plugin-test-formatting": ["error", { formatWithPrettier: false }] */

import { RuleTester } from '@typescript-eslint/rule-tester'

import rule from './lines-between-class-members'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('lines-between-class-members', rule, {
  valid: [
    {
      code: `
class foo {
baz1() { }

baz2() { }

bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

qux1() { }

qux2() { }
};
      `,
      options: ['always'],
    },
    {
      code: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

baz() { }

qux() { }
};
      `,
      options: ['always', { exceptAfterOverload: true }],
    },
    {
      code: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

baz() { }
qux() { }
};
      `,
      options: [
        'always',
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
    },
    {
      code: `
class foo{
bar(a: string):void;

bar(a: string, b:string):void;

bar(a: string, b:string){

}

baz() { }

qux() { }
};
      `,
      options: [
        'always',
        { exceptAfterOverload: false, exceptAfterSingleLine: false },
      ],
    },
    {
      code: `
class foo {
bar(a: string):void
bar(a: string, b:string):void;
bar(a: string, b:string){

}
baz() { }
qux() { }
};
      `,
      options: [
        'never',
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
    },
    {
      code: `
class foo{
bar(a: string):void
bar(a: string, b:string):void;
bar(a: string, b:string){

}
baz() { }
qux() { }
};
      `,
      options: [
        'never',
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
    },
    {
      code: `
abstract class foo {
abstract bar(a: string): void;
abstract bar(a: string, b: string): void;
};
      `,
      options: ['always'],
    },
    {
      code: `
interface foo {
bar(): void;

baz(): void;
};
      `,
      options: ['always'],
    },
    {
      code: `
interface foo {
bar(): void;
baz(): void;
};
      `,
      options: ['never'],
    },
  ],
  invalid: [
    {
      code: `
class foo {
baz1() { }
baz2() { }

bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

qux1() { }
qux2() { }
};
      `,
      output: `
class foo {
baz1() { }

baz2() { }

bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

qux1() { }

qux2() { }
};
      `,
      options: ['always'],
      errors: [
        {
          messageId: 'always',
        },
        {
          messageId: 'always',
        },
      ],
    },
    {
      code: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}
baz() { }
qux() { }
}
      `,
      output: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

baz() { }

qux() { }
}
      `,
      options: ['always', { exceptAfterOverload: true }],
      errors: [
        {
          messageId: 'always',
        },
        {
          messageId: 'always',
        },
      ],
    },
    {
      code: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}
baz() { }
qux() { }
}
      `,
      output: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

baz() { }
qux() { }
}
      `,
      options: [
        'always',
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
      errors: [
        {
          messageId: 'always',
        },
      ],
    },
    {
      code: `
class foo {
bar(a: string): void;
bar(a: string, b:string): void;
bar(a: string, b:string) {

}

baz() { }
qux() { }
}
      `,
      output: `
class foo {
bar(a: string): void;

bar(a: string, b:string): void;

bar(a: string, b:string) {

}

baz() { }

qux() { }
}
      `,
      options: [
        'always',
        { exceptAfterOverload: false, exceptAfterSingleLine: false },
      ],
      errors: [
        {
          messageId: 'always',
        },
        {
          messageId: 'always',
        },
        {
          messageId: 'always',
        },
      ],
    },
    {
      code: `
class foo{
bar(a: string):void;

bar(a: string, b:string):void;

bar(a: string, b:string){

}

baz() { }

qux() { }
};
      `,
      output: `
class foo{
bar(a: string):void;
bar(a: string, b:string):void;
bar(a: string, b:string){

}
baz() { }
qux() { }
};
      `,
      options: [
        'never',
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
      errors: [
        {
          messageId: 'never',
        },
        {
          messageId: 'never',
        },
        {
          messageId: 'never',
        },
        {
          messageId: 'never',
        },
      ],
    },
    {
      code: `
interface foo {
bar(): void;
baz(): void;
};
      `,
      output: `
interface foo {
bar(): void;

baz(): void;
};
      `,
      options: ['always'],
      errors: [
        {
          messageId: 'always',
        },
      ],
    },
    {
      code: `
interface foo {
bar(): void;

baz(): void;
};
      `,
      output: `
interface foo {
bar(): void;
baz(): void;
};
      `,
      options: ['never'],
      errors: [
        {
          messageId: 'never',
        },
      ],
    },
  ],
})

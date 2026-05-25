const commander = require('../');

// Capitalise the letters of words after dashes, but otherwise preserve case

test('when option defined with --word-word then option property is wordWord', () => {
  const program = new commander.Command();
  program.option('--my-option', 'description');
  program.parse(['node', 'test', '--my-option']);
  expect(program.opts().myOption).toBe(true);
});

test('when option defined with --word-wORD then option property is wordWORD', () => {
  const program = new commander.Command();
  program.option('--my-oPTION', 'description');
  program.parse(['node', 'test', '--my-oPTION']);
  expect(program.opts().myOPTION).toBe(true);
});

test('when option defined with --word-WORD then option property is wordWORD', () => {
  const program = new commander.Command();
  program.option('--my-OPTION', 'description');
  program.parse(['node', 'test', '--my-OPTION']);
  expect(program.opts().myOPTION).toBe(true);
});

test('when option defined with --word-word-word then option property is wordWordWord', () => {
  const program = new commander.Command();
  program.option('--my-special-option', 'description');
  program.parse(['node', 'test', '--my-special-option']);
  expect(program.opts().mySpecialOption).toBe(true);
});

test('when option defined with --word-WORD-word then option property is wordWORDWord', () => {
  const program = new commander.Command();
  program.option('--my-SPECIAL-option', 'description');
  program.parse(['node', 'test', '--my-SPECIAL-option']);
  expect(program.opts().mySPECIALOption).toBe(true);
});

test('when option defined with --Word then option property is Word', () => {
  const program = new commander.Command();
  program.option('--Myoption', 'description');
  program.parse(['node', 'test', '--Myoption']);
  expect(program.opts().Myoption).toBe(true);
});

test.each([
  ['--my--option', 'myOption'],
  ['--my-option-', 'myOption'],
  ['--my--special--option', 'mySpecialOption'],
])(
  'when option defined with %s then option property is %s',
  (flag, expectedProperty) => {
    const program = new commander.Command();
    program.option(flag, 'description');
    program.parse(['node', 'test', flag]);
    expect(program.opts()[expectedProperty]).toBe(true);
  },
);

test('camelcase handles multiple consecutive dashes', () => {
  // Would have crashed with TypeError before fix
  const option = new commander.Option('--my--option');
  expect(option.attributeName()).toBe('myOption');
});

test('camelcase handles trailing dash', () => {
  const option = new commander.Option('--my-option-');
  expect(option.attributeName()).toBe('myOption');
});

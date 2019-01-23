const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    //store response in variable
    let from = 'Peter';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text,
    })
  });
});
import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    function randomAndCheck(): number {
      let tempId = Math.floor(Math.random() * 999);
      if (tempId.toString() in messages) {
        return randomAndCheck();
      } else {
        return tempId;
      }
    }

    const id = randomAndCheck();
    messages[id.toString()] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/upload-products', imageName);

    if (!existsSync(path))
      throw new BadRequestException('No se encontro la imagen del producto');

    return path;
  }
}

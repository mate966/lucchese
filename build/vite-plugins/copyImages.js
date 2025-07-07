import fs from 'fs-extra';
import { resolve } from 'path';

export default function copyImages() {
    return {
        name: 'copy-images',
        async closeBundle() {
            fs.copySync(
                resolve(__dirname, '../../src/assets/images'),
                resolve(__dirname, '../../dist/assets/images')
            );
        },
    };
}

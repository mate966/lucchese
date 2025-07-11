import fs from 'fs-extra';
import { resolve } from 'path';

export default function copyAssets() {
    return {
        name: 'copy-assets',
        async closeBundle() {
            fs.copySync(
                resolve(__dirname, '../../src/assets/images'),
                resolve(__dirname, '../../public/assets/images')
            );
            fs.copySync(
                resolve(__dirname, '../../src/assets/fonts'),
                resolve(__dirname, '../../public/assets/fonts')
            );
        },
    };
}

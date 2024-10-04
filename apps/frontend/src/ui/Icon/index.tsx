import { SVGProps } from 'react';
import clsx from 'clsx';

import sprite from '../../assets/sprite.svg';

import styles from './index.module.scss';

export interface IconProps extends SVGProps<SVGSVGElement> {
    id: string;   
    boxStyles?: string;
}

const Icon = ({ id, boxStyles, ...rest }: IconProps) => {
    return (
        <div className={clsx(styles.box, boxStyles)}>
            <svg {...rest}>
                <use href={`${sprite}#${id}`} />
            </svg>
        </div>
    );
};

export default Icon;
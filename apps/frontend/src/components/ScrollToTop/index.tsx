import { useState, useEffect } from 'react';

import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

import style from './index.module.scss'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    type="button" variant="icon" icon={<Icon id={'angle-left-circle'} className={style.btnTop__icon } />}
                    className={style.btnTop}
                />
            )}
        </div>
    )
}

export default ScrollToTop
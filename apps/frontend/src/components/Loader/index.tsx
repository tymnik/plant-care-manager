import { useEffect, useState } from 'react';

import style from './index.module.scss';

const Loader = () => {
    const [leaves, setLeaves] = useState<number[]>([]);

    useEffect(() => {        
        const randomLeaves = Array.from({ length: 5 }, () => Math.random());
        setLeaves(randomLeaves);
    }, []);

    return (
        <div className={style.loaderWrapper}>
            <div className={style.loader}>
                <div className={style.loader__circle}></div>
                {leaves.map((leaf, index) => (
                    <div
                        key={index}
                        className={style.loader__leaf}
                        style={{
                            left: `${leaf * 100}%`,
                            animationDuration: `${2 + leaf * 3}s`,
                        }}
                    >
                        🍂
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;

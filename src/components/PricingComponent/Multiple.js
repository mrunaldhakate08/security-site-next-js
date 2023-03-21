import Slider from '@mui/material/Slider';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import styles from '../CommonComponents/pricing.module.scss';
import { styled } from '@mui/material/styles';
import PriceCard from './PriceCard';

const PrettoSlider = styled(Slider)({
    color: "#6D6D6D",
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#eb5424',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});


function Multiple({ pricingFeatures }) {
    const [step, setStep] = useState(10);
    const [value, setValue] = useState(20);
    const [premium, setPremium] = useState(449);
    const [allIncl, setAllIncl] = useState(649);
    const [min, setMin] = useState(10);
    const [max, setMax] = useState(50);

    const getText = (valu) => `${value}`;
    const changeValue = (event, value) => {
        setValue(value);
    };

    const [compare, setCompare] = useState(false);


    const comparePlansHandler = () => {
        setCompare((prevState) => !prevState);
    }

    const decrementUsers = () => {
        if (value >= min) {
            setValue(value - 10);
        }
    }
    const incrementUsers = () => {
        if (value <= max) {
            setValue(value + 10);
        }
    }

    const priceValue = {
        10: [349, 449, 549, 649],
        20: [449, 549, 649, 749],
        30: [549, 649, 749, 849],
        40: [649, 749, 849, 949,],
        50: [749, 849, 949, 1049],

    }

    useEffect(() => {
        setPremium(priceValue[value][1]);
        setAllIncl(priceValue[value][3]);

    }, [value])



    const data = pricingFeatures.map((element) => {
        return (
            <tr >
                <td>{element.title}</td>
                <td className='text-center'>{element.featureOne}</td>
                <td className='text-center'>{element.featureTwo}</td>
            </tr>
        )
    })


    return (
        <>
            <Box width={300} >
                <PrettoSlider
                    defaultValue={20}
                    step={step}
                    value={value}
                    marks
                    min={10}
                    max={50}
                    onChange={changeValue}
                    getAriaValueText={getText}
                    color="secondary"
                    valueLabelDisplay="on"
                />
            </Box>

            <div className={`${styles.counter} d-flex justify-content-center align-items-center `}>
                <button onClick={decrementUsers} className={styles.buttonLeft} disabled={value === 10}>-</button>&nbsp;&nbsp;
                {value} users&nbsp;&nbsp;
                <button onClick={incrementUsers} className={styles.buttonRight} disabled={value === 50}>+</button>
            </div>

            <div className='d-flex mt-5 flex-wrap' style={{ width: "100%", justifyContent: "space-around" }}>
                <PriceCard width={18} type="Premium" price={premium} team="Best for xyz/team/individual" features={["-", "-", "Autoredirect to IDP", "Protect your Complete Site", "SAML Single Logout"]} />
                <PriceCard width={18} type="All Inclusive" price={allIncl} team="Best for xyz/team/individual" features={["-", "-", "Autoredirect to IDP", "Protect your Complete Site", "SAML Single Logout"]} />
            </div>

            <div className={`mt-5 ${styles.comparePlansBtn}`} onClick={comparePlansHandler}>
                {(compare === false ? "Show Comparison" : "Hide Comparison")}
            </div>
            <div className={`${styles.scrollTable} container-fluid`}>
                {compare &&
                    <table className="table table-stripped mt-5">
                        <thead>
                            <tr>
                                <br />
                                <PricingCompHead type="Premium" price={premium} team="Best for xyz/team/individual" />
                                <PricingCompHead type="All Inclusive" price={allIncl} team="Best for xyz/team/individual" />
                            </tr>
                            <br />
                        </thead>
                        <tbody className='mt-4'>
                            {data}
                        </tbody>
                    </table>
                }
            </div>

        </>
    )
}

export default Multiple
import { createStyles, css } from "antd-style";

export const useStyles = createStyles(() => ({
    form: css`
        max-width: 500px;
        min-height: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto auto;
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
    `,

    formItem: css`
        margin-bottom: 30px;
        width: 100%;
    `,

    formInput: css`
        height: 2.5rem;
        width: 100%;
    `,
    button: css`
        width: 100%;
        background-color: #1890ff;
        color: #fff;
        height: 2.5rem;
        margin-bottom: 10px;
    `,

    title: css`
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
    `,

}));    
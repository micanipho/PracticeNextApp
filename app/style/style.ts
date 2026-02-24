import { createStyles, css } from "antd-style";

export const useStyles = createStyles(() => ({
    container: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 2rem;
        text-align: center;
    `,
    errorMessage: css`
        color: red;
        margin-top: 1rem;
        margin-bottom: 2rem;
    `,
    retryButton: css`
        padding: 0.5rem 1rem;
        background-color: #0070f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            opacity: 0.9;
        }
    `
}));

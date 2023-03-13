import * as Yup from 'yup';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Form from '@/components/Form/Form';

const schema = [
    {
        label: '帳號',
        type: 'text',
        name: 'username'
    },
    {
        label: '密碼',
        type: 'password',
        name: 'password'
    },
    {
        label: '數字',
        type: 'number',
        name: 'number'
    }
];

const defaultValues = {
    username: 'test',
    password: '',
    number: 123
};

const validationSchema = Yup.object({
    username: Yup.string()
        .max(20, '帳號長度不可超過 20 字')
        .required('請輸入帳號'),
    password: Yup.string()
        .max(20, '密碼長度不可超過 20 字')
        .required('請輸入密碼'),
    number: Yup.number().min(0, '數字不可低於 0').max(1000, '數字不可超過 1000')
});

const onSubmit = (values) => console.log(values);

async function wait() {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                username: 'test',
                password: '',
                number: 123
            });
        }, 1000);
    });
}

function Login() {
    return (
        <Paper sx={{ display: 'inline-block' }}>
            <Box
                sx={{
                    p: 1,
                    textAlign: 'center',
                    borderRadius: '4px 4px 0 0'
                }}
            >
                <Typography>登入</Typography>
            </Box>
            <Divider />
            <Box sx={{ px: 2, pb: 1 }}>
                <Form
                    onSubmit={onSubmit}
                    schema={schema}
                    validationSchema={validationSchema}
                    defaultValues={wait}
                />
            </Box>
        </Paper>
    );
}

export default Login;

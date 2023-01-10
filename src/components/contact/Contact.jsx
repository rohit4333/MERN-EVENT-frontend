import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Contact = () => {
  return (
    <Box>
      <Wrapper>
        <Typography variant="h3">Getting in touch is easy!</Typography>
        <Text variant="h5">
          Reach out to me on
          <Link
            href="https://www.instagram.com/ro.hit_here/"
            color="inherit"
            target="_blank"
          >
            <Instagram />
          </Link>
          or send me an Email
          <Link
            href="mailto:rohit993583@gmail.com?Subject=Wanted to get in Touch with you"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Contact;

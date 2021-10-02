import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.getContrastText(theme.palette.grey[700]),
  padding: '10px',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  cursor: 'pointer',
}));

const LogoContainer = styled('div')({
  width: '40px',
  marginRight: '10px',
  cursor: 'pointer',
});

const Logo = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  objectFit: 'contain',
}));

const PinkLogo = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
}));

const Content = styled('div')({
  flex: 1,
  maxWidth: 'calc(100% - 50px)',
});

const TagsContainer = styled('div')({
  overflow: 'auto',
  height: '26px',
});

const Tag = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  borderRadius: '10px',
  display: 'inline-block',
  padding: '2px 5px',
  fontSize: '12px',
  marginRight: '5px',
  marginTop: '5px',
  cursor: 'pointer',
}));

function ChannelLogo({ src, name, onClick }) {
  if (src) {
    return (
      <LogoContainer>
        <Logo
          src={src}
          alt={name}
          onClick={onClick}
        />
      </LogoContainer>
    );
  }
  return (
    <LogoContainer>
      <PinkLogo
        alt={name}
        onClick={onClick}
      >
        { name ? (name.length > 2 ? name.slice(0, 2) : name) : <LiveTvIcon />}
      </PinkLogo>
    </LogoContainer>
  );
}

ChannelLogo.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ChannelLogo.defaultProps = {
  src: undefined,
};

export function Channel({
  logo,
  description,
  language,
  group,
  gotoChannel,
  onSelectCategory,
  onSelectLanguage,
}) {
  const tags = [group, language].filter(i => !!i);
  return (
    <StyledCard>
      <ChannelLogo src={logo} name={description} onClick={gotoChannel} />
      <Content>
        <Description
          variant="subtitle2"
          noWrap
          onClick={gotoChannel}
        >
          {description}
        </Description>
        {
          tags.length > 0 ? (
            <TagsContainer
              title={tags.join(',')}
            >
              {
                group ? (
                  <Tag title={group} onClick={() => onSelectCategory(group)}>
                    {group}
                  </Tag>
                ) : null
              }
              {
                language ? (
                  <Tag title={language} onClick={() => onSelectLanguage(language)}>
                    {language}
                  </Tag>
                ) : null
              }
            </TagsContainer>
          ) : null
        }
      </Content>
    </StyledCard>
  );
}

Channel.propTypes = {
  logo: PropTypes.string,
  description: PropTypes.string.isRequired,
  language: PropTypes.string,
  country: PropTypes.string,
  group: PropTypes.string,
  gotoChannel: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectLanguage: PropTypes.func.isRequired,
};

Channel.defaultProps = {
  logo: undefined,
  language: undefined,
  country: undefined,
  group: undefined,
};



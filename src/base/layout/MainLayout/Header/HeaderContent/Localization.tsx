import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ClickAwayListener, Grid, List, ListItemButton, ListItemText, Paper, Popper, Typography, useMediaQuery } from '@mui/material';

// project import
import IconButton from '@/base/components/@extended/IconButton';
import Transitions from '@/base/components/@extended/Transitions';
import useConfig from '@/base/hooks/useConfig';

// assets
import { TranslationOutlined } from '@ant-design/icons';
import { I18n } from '@/types/config';
import i18n from '@/utils/lang/i18n';

// ==============================|| HEADER CONTENT - LOCALIZATION ||============================== //

const Localization = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const {  onChangeLocalization } = useConfig();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (lang: I18n) => {
    onChangeLocalization(lang);
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === 'dark' ? 'background.default' : 'grey.100';
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <TranslationOutlined rev={{}}/>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [ 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    p: 0,
                    width: '100%',
                    minWidth: 200,
                    maxWidth: 290,
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 0.5,
                    [theme.breakpoints.down('md')]: {
                      maxWidth: 250
                    }
                  }}
                >
                  <ListItemButton selected={i18n.language === 'en'} onClick={() => handleListItemClick('en')}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Typography color="textPrimary">English</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                            (UK)
                          </Typography>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton selected={i18n.language === 'fr'} onClick={() => handleListItemClick('fr')}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Typography color="textPrimary">français</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                            (French)
                          </Typography>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton selected={i18n.language === 'ko'} onClick={() => handleListItemClick('ko')}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Typography color="textPrimary">한국어</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                            (Korean)
                          </Typography>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton selected={i18n.language === 'zh'} onClick={() => handleListItemClick('zh')}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Typography color="textPrimary">中国人</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                            (Chinese)
                          </Typography>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton selected={i18n.language === 'vi'} onClick={() => handleListItemClick('vi')}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Typography color="textPrimary">Tiếng Việt</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                            (Vietnamese)
                          </Typography>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Localization;

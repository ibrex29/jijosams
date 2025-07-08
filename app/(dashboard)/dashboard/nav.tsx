import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";

import theme from "@/config/theme";

import { useResponsive } from "../hooks/use-responsive";
import { NAV } from "./config-layout";
import {
  authorNavConfig,
  basePath,
  editorInChiefNavConfig,
  managingEditorNavConfig,
  reviewerNavConfig,
  sectionEditorNavConfig,
} from "./config-navigation";
import Scrollbar from "@/app/components/@dashboard/components/@dashboard/scrollbar";

interface NavItemProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
    number?: number;
  };
}

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname();
  const upLg = useResponsive("up", "lg", null);

  let navConfig;
  switch (true) {
    case pathname?.includes(basePath.managing_editor):
      navConfig = managingEditorNavConfig;
      break;
    case pathname?.includes(basePath.reviewer):
      navConfig = reviewerNavConfig;
      break;
    case pathname?.includes(basePath.author):
      navConfig = authorNavConfig;
      break;
    case pathname?.includes(basePath.editor_in_chief):
      navConfig = editorInChiefNavConfig;
      break;
    default:
      navConfig = sectionEditorNavConfig;
  }

  const updatedNavConfig = navConfig;

  const renderMenu = (
    <Stack component="nav" spacing={3} sx={{ px: 2 }}>
      {updatedNavConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* <Logo sx={{ mt: 2, ml: 4 }} /> */}

      <Box sx={{ mb: 5 }} />

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            backgroundColor: "theme.palette.common.white",
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === item.path;

  return (
    <ListItemButton
      component={Link}
      href={item.path}
      sx={{
        minHeight: 22,
        borderRadius: 2.75,
        typography: "body2",
        color: theme.palette.text.secondary,
        textTransform: "capitalize",
        fontWeight: theme.typography.fontWeightMedium,
        "&:hover": {
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        ...(active && {
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightBold,
          bgcolor: theme.palette.primary.main,
          "&:hover": {
            bgcolor: theme.palette.primary.light,
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">
        {item.title}
        {item.number && (
          <Badge badgeContent={item.number} color="success" sx={{ ml: 4 }}>
            {" "}
          </Badge>
        )}
      </Box>
    </ListItemButton>
  );
}

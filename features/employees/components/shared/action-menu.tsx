import { useState } from 'react';
import { MoreHorizontal, Eye, Edit, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  disableArchive?: boolean;
}

export function ActionMenu({
  onView,
  onEdit,
  onArchive,
  onDelete,
  disableArchive,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <AnimatePresence>
        {open && (
          <DropdownMenuContent
            align="end"
            className="w-[160px]"
            asChild
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {onView && (
                <DropdownMenuItem onClick={onView} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                  View Details
                </DropdownMenuItem>
              )}
              
              {onEdit && (
                <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                  Edit Employee
                </DropdownMenuItem>
              )}

              {(onArchive || onDelete) && <DropdownMenuSeparator />}

              {onArchive && (
                <DropdownMenuItem
                  onClick={onArchive}
                  disabled={disableArchive}
                  className="cursor-pointer focus:bg-warning/10 focus:text-warning"
                >
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
              )}
              
              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}

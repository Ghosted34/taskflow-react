import type { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertOctagon,
  Bell,
  CheckCircleIcon,
  Info,
  XSquareIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { markAllAsRead, markAsRead } from "../slice";

type NotificationType = "create" | "update" | "delete" | "complete" | "default";
const typeStyles: Record<
  NotificationType,
  { icon: JSX.Element; className: string }
> = {
  complete: {
    icon: <CheckCircleIcon className="w-5 h-5" />,
    className: "bg-green-50 border-green-400 text-green-700",
  },
  create: {
    icon: <Info className="w-5 h-5" />,
    className: "bg-blue-50 border-blue-400 text-blue-700",
  },
  update: {
    icon: <AlertOctagon className="w-5 h-5" />,
    className: "bg-yellow-50 border-yellow-400 text-yellow-700",
  },
  delete: {
    icon: <XSquareIcon className="w-5 h-5" />,
    className: "bg-red-50 border-red-400 text-red-700",
  },
  default: {
    icon: <Bell className="w-5 h-5" />,
    className: "bg-gray-50 border-gray-300 text-gray-800",
  },
};

export function Notifications() {
  const notifications = useSelector(
    (state: RootState) => state.notifications.items
  );
  const dispatch = useDispatch<AppDispatch>();

  // handle click (mark as read)
  const handleClick = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAll = () => {
    dispatch(markAllAsRead());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-2">
        <div className="flex items-center justify-between border-b pb-2 mb-2">
          <span className="font-semibold text-sm">Notifications</span>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAll}>
              Mark all as read
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="text-sm text-muted-foreground px-2 py-4 text-center">
            No notifications
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence initial={false}>
              {notifications.map((n) => {
                const style = typeStyles[n.type || "default"];
                return (
                  <motion.div
                    key={n.id}
                    className={`rounded-md border p-2 hover:bg-accent cursor-pointer ${style.className}`}
                    onClick={() => handleClick(n.id)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                  >
                    <div className="flex flex-row gap-4 items-center">
                      <div>{style.icon}</div>
                      <div className="font-medium">{n.title}</div>
                    </div>
                    {n.description && (
                      <div className="text-sm text-muted-foreground">
                        {n.description}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

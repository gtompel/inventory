import Navbar from "@/components/navbar";
import Form from "@/components/task-form";
import List from "@/components/task-list";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";


export default async function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <ResizablePanelGroup className="h-full w-full border" direction="horizontal">
        <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <div className="h-full flex flex-col justify-center p-6 space-y-4">
            <div className="space-y-2">
              <CardTitle>Добавить задачу</CardTitle>
              <CardDescription>Добавьте новую задачу.</CardDescription>
              </div>
          <Form />
          </div>
        </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel>
            Правая панель
          </ResizablePanel>

        </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel>
        <List />
        </ResizablePanel>



      </ResizablePanelGroup>

    </div>

  );
}

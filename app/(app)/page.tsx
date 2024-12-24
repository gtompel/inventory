import Charts from "@/components/charts";
import Form from "@/components/task-form";
import List from "@/components/task-list";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";



export default async function Home() {


  return (


      <ResizablePanelGroup className="h-full w-full border border-t-0 z-0" direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40}>
              <div className="h-full flex flex-col justify-center p-6 space-y-4">
                <div className="space-y-2">
                  <CardTitle>Добавить задачу</CardTitle>
                  <CardDescription>Добавьте новую задачу.</CardDescription>
                </div>
                <Form />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="min-h-[30vh] h-full" defaultSize={60}>
              <Charts />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="max-w-[75vw] min-w-[30vw]" defaultSize={40}>
          <div className="h-full overflow-y-auto p-6">
            <List />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

  );
}

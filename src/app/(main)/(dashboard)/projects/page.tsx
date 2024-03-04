function ProjectsPage() {
  return (
    <div className="flex flex-col  gap-4">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i) => (
        <div key={i} className="h-20 w-20 shrink-0 bg-white">
          heo
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;

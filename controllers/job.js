import prisma from '../config/prismaCliente.js';

const jobControllers = {
  // GET /jobs → fetch only jobs from logged-in user
  getAllJobs: async (req, res) => {
    try {
      const jobs = await prisma.job.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch jobs.' });
    }
  },

  // GET /job/:id → fetch one job if it belongs to the user
  getJobById: async (req, res) => {
    try {
      const job = await prisma.job.findFirst({
        where: {
          id: parseInt(req.params.id),
          userId: req.user.id
        }
      });

      if (!job) {
        return res.status(404).json({ error: 'Job not found.' });
      }

      res.status(200).json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch job.' });
    }
  },

  // POST /job → create new job for authenticated user
  createJob: async (req, res) => {
    const {
      companyName,
      jobRole,
      salary,
      interviewDate,
      location,
      status,
      notes
    } = req.body;

    const attachment = req.file ? req.file.filename : null;

    try {
      const newJob = await prisma.job.create({
        data: {
          companyName,
          jobRole,
          salary: salary ? parseFloat(salary) : null,
          interviewDate: interviewDate ? new Date(interviewDate) : null,
          location,
          status,
          notes,
          attachment,
          userId: req.user.id
        }
      });

      res.status(201).json(newJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create job.' });
    }
  },

  // PUT /job/:id → update a job (only if it belongs to the user)
  updateJobById: async (req, res) => {
    const { id } = req.params;
    const {
      companyName,
      jobRole,
      salary,
      interviewDate,
      location,
      status,
      jobUrl,
      notes
    } = req.body;

    try {
      const job = await prisma.job.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id
        }
      });

      if (!job) {
        return res.status(404).json({ error: 'Job not found.' });
      }

      const updatedJob = await prisma.job.update({
        where: { id: job.id },
        data: {
          companyName,
          jobRole,
          salary: salary ? parseFloat(salary) : null,
          interviewDate: interviewDate ? new Date(interviewDate) : null,
          location,
          status,
          jobUrl,
          notes
        }
      });

      res.status(200).json(updatedJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update job.' });
    }
  },

  // DELETE /job/:id → delete only if it belongs to the user
  deleteJobById: async (req, res) => {
    const { id } = req.params;

    try {
      const job = await prisma.job.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id
        }
      });

      if (!job) {
        return res.status(404).json({ error: 'Job not found.' });
      }

      await prisma.job.delete({ where: { id: job.id } });

      res.status(200).json({ message: 'Job deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete job.' });
    }
  },

  // GET /jobs/search?query=xxx → search jobs of current user
  searchJobs: async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    try {
      const jobs = await prisma.job.findMany({
        where: {
          userId: req.user.id,
          OR: [
            { companyName: { contains: query, mode: 'insensitive' } },
            { jobRole: { contains: query, mode: 'insensitive' } }
          ]
        }
      });

      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to search jobs.' });
    }
  }
};

export default jobControllers;

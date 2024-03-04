import matplotlib.pyplot as plt

A = (3, 2)
B = (5, 10)

imsize = 512 / 100
fig, ax = plt.subplots(figsize=(imsize, imsize), dpi=100)
ax.set_facecolor((0.0, 0.0, 0.0))

plt.axis('equal')
fig.subplots_adjust(left=0, right=1, top=1, bottom=0, wspace=0, hspace=0)

ax.plot((A[0], B[0]), (A[1], B[1]), color="white", lw=1.2, alpha=0.8, ls="-")
plt.annotate('A', A, xytext=(A[0]-0.5, A[1]+0.5), color="lightgreen")
plt.annotate('B', B, xytext=(B[0]+0.5, B[1]-0.5), color="lightgreen")

xmin = min(A[0], B[0])
xmax = max(A[0], B[0])
ymin = min(A[1], B[1])
ymax = max(A[1], B[1])
plt.margins((xmax - xmin) * 0.1, (ymax - ymin) * 0.1)

plt.show()